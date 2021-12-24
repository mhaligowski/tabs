export const useClipboard = () => {
  return {
    copy: (value: string) => {
      navigator.clipboard.writeText(value);
    },
  };
};
