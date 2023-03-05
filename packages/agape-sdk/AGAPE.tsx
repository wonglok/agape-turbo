import * as React from "react";
import { BoxGeometry, Mesh, MeshBasicMaterial, Object3D } from "three";

export const AGAPE = ({ json = {}, parent = new Object3D() }) => {
  React.useEffect(() => {
    let o3d = new Object3D();
    parent.add(o3d);

    o3d.add(
      new Mesh(
        new BoxGeometry(1, 1, 1),
        new MeshBasicMaterial({ color: 0xff0000 })
      )
    );

    return () => {
      o3d.removeFromParent();
      //
    };
  }, [parent, json]);

  return null;
};

//
