interface Props {}

export const Alert: FC<Props> = ({ children }) => <p className="inline-block rounded bg-red-500/50 p-2">{children}</p>;
