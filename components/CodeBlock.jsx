import SyntaxHighlighter from "react-syntax-highlighter";

export default async function CodeBlock(props) {
    console.log(props)
  return (
    <SyntaxHighlighter language={props.language} style={light}>
      {props.value}
    </SyntaxHighlighter>
  );
}
