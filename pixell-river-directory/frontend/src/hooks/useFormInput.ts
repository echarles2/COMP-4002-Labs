import { useState } from "react";

type ValidateFn = (value: string) => string | null;

type UseFormInputReturn = {
  value: string;
  setValue: (newValue: string) => void;

  messages: string[];
  setMessages: (newMessages: string[]) => void;
  clearMessages: () => void;

  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;

  validate: (validateFn: ValidateFn) => boolean;
};

export function useFormInput(initialValue: string = ""): UseFormInputReturn {
  var [value, setValue] = useState(initialValue);
  var [messages, setMessages] = useState<string[]>([]);

  function clearMessages() {
    setMessages([]);
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setValue(e.target.value);
    clearMessages();
  }

  function validate(validateFn: ValidateFn): boolean {
    var result = validateFn(value);

    if (result) {
      setMessages([result]);
      return false;
    }

    setMessages([]);
    return true;
  }

  return {
    value,
    setValue,
    messages,
    setMessages,
    clearMessages,
    onChange,
    validate
  };
}