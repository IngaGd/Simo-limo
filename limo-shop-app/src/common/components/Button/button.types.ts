export type ButtonProps = {
  buttonLabel: String;
  handleClick?:
    | ((p: {
        id: number;
        title: string;
        price: number;
        description: string;
        imagePath: string;
      }) => void)
    | undefined;
};
