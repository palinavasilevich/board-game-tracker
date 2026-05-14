type ErrorMessageProps = {
  message: string;
};

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <p className="text-sm text-destructive" role="alert">
      {message}
    </p>
  );
}
