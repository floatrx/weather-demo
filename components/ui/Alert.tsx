interface Props {}

/**
 * Simple alert banner to display error messages
 * @param children - Error message or any other text|component
 * @constructor
 */
export const Alert: FC<Props> = ({ children }) => <p className="inline-block rounded bg-red-500/50 p-2">{children}</p>;
