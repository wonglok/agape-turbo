import { ethers } from "ethers";
import { v4 } from "uuid";
import md5 from "md5";
import axios from "axios";
import { Backend } from "../aws-backend.config.js";

export function checkIsAddressCorrect(address) {
  try {
    return Boolean(utils.getAddress(address));
  } catch (e) {
    console.error(e);
    return false;
  }
}
export const getBackendURL = () => {
  let env = process.env.NODE_ENV;
  return Backend[env];
};

export const loginMetamask = async () => {
  //

  let provider;
  if (typeof window !== "undefined" && window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  } else {
    provider = null;
  }

  await provider.send("eth_requestAccounts", []);

  let signer = provider?.getSigner();

  const providerAddress = await signer.getAddress();
  let dataObject = {
    userID: providerAddress,
    uri: `${window.location.origin}`,
  };

  let nonce = `${md5(JSON.stringify(dataObject))}`;

  let rawMessage = `Login to AGAPE Engine
You: ${dataObject.userID}
Domain: ${dataObject.uri}
Nonce: ${nonce}
`;
  const signature = await signer.signMessage(rawMessage);

  return fetch(`${getBackendURL().rest}/auth-center`, {
    method: "post",
    mode: "cors",
    body: JSON.stringify({
      action: "getMetamaskJWT",
      payload: {
        rawMessage,
        signature,
        userID: providerAddress,
      },
    }),
  })
    .then(async (r) => {
      let data = await r.json();

      if (r.ok) {
        return data;
      } else {
        throw data;
      }
    })
    .then((data) => {
      console.log(data);
    })
    .catch((data) => {
      console.error(data);
    });
};
