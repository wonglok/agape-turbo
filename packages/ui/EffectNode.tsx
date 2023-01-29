import * as React from "react";
import { Object3D } from "three";

export const EffectNode = ({ json = {}, parent = new Object3D() }) => {
  React.useEffect(() => {
    let o3d = new Object3D();
    parent.add(o3d);

    return () => {
      o3d.removeFromParent();
      //
    };
  }, [parent, json]);

  return null;
};

//
