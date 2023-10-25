import { useEffect, useState } from "react"
export type TSetValueCallback<T> = (value: T) => T;
export type TSetValue<T> = (param: (TSetValueCallback<T> | T)) => void;

export const useLocaleStorage = <T extends any>(key: string, defaultValue?: T ): [value: T, setValue: TSetValue<T>] => {
    const [value, _setValue] = useState<T | undefined>(defaultValue)
    

 const setValue: TSetValue<T> = (param) => {
    const result = typeof param === 'function' ? (param as TSetValueCallback<T>)(value as T) : param;
      
     localStorage.setItem(key, JSON.stringify(result))

     _setValue(result) 
    }

    
    const getValue = () => {
        const result = localStorage.getItem(key)
        if (result) {
            _setValue(JSON.parse(result))
        }
    }      

    useEffect(() => {
        getValue()        
    },[])

    return [value as T, setValue]
}

