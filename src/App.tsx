import { createGlobalStyle } from "styled-components";
import Routers from "./routes/Routers";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// reset all html tags with createGlobalStyle
const GlobalStyle = createGlobalStyle`
// import fonts 
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');

/* http://meyerweb.com/eric/tools/css/reset/
   v5.0.1 | 20191019
   License: none (public domain)
*/
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}

// add global styles
* {
	box-sizing: border-box;
}
body {
	font-family: 'Source Sans Pro', sans-serif;
	font-weight: 300;
	background-color: ${(props) => props.theme.bgColor};
	color: ${(props) => props.theme.textColor};
	line-height: 1.2;
}
a {
	text-decoration: none;
	color: inherit;
}
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Routers />
      <ReactQueryDevtools initialIsOpen={true} />
    </>
  );
};

export default App;
