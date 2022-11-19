import { Html, Head, Main, NextScript } from "next/document";

const dashboard = () => {
  return (
    <Html data-theme="corporate">
      <Head />
      <body>
      <div tabIndex={0} className="collapse border border-base-300 bg-base-100 rounded-box"> 
  <div className="collapse-title text-xl font-medium">
    Focus me to see content
  </div>
  <div className="collapse-content"> 
    <p>tabIndex={0} attribute is necessary to make the div focusable</p>
  </div>
</div>
      </body>
    </Html>
  );
};

export default dashboard;
