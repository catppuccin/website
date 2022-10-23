export const SVGIcon = ({ svgContent }: { svgContent: string }) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: svgContent }}
      style={{ width: "30px" }}
    />
  );
};
