import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { synthwave84 } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeSnippet = ({ language, code }) => {
    return (
        <SyntaxHighlighter
            language={language}
            style={synthwave84}
            showLineNumbers
            wrapLines
        >
            {code}
        </SyntaxHighlighter>
    );
}

export default CodeSnippet;