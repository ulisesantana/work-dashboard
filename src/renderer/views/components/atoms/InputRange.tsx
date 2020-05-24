import React, {ChangeEventHandler, useCallback, useEffect, useState} from "react";


export function InputRange({...props}) {
    return (<input  {...props} type="range" />);
}
