import { useEffect } from "react";

function useOnClickOutSide(events: string[], ref:any, handler: Function):void{
  
  useEffect(() => {
    const listener = (event:any) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    events.map(event=>{
      return document.addEventListener(event, listener);
    })
    return () => {
      events.map(event=>{
        return document.removeEventListener(event, listener);
      })
    };
  }, [ref, handler, events]);
}

export default useOnClickOutSide;

/**
 * @params ([event], ref: DOMNode, callback: func)
  */