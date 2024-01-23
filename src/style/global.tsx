import styled, { createGlobalStyle } from "styled-components";
import "@/style/font.css";
import "@/style/color.css";
export const GlobalStyle = createGlobalStyle`

@font-face {
	font-family: 'Pretendard Variable';
	font-weight: 100 800;
	font-style: normal;
	font-display: swap;
	src: local('Pretendard Variable'), url('./font/PretendardVariable.woff2') format('woff2-variations');
}

@font-face {
    font-family: 'Happiness-Sans-Bold';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2205@1.0/Happiness-Sans-Bold.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
}
@font-face {
    font-family: 'Happiness-Sans-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2205@1.0/Happiness-Sans-Regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
}

* {
	box-sizing: border-box;
	padding: 0;
	margin: 0;
	font-family: 'Pretendard Variable';
	color: var(--Dark);
	
}


html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	vertical-align: baseline;
  	position: relative;
		@media (max-width: 530px) {
    font-size: 14px;
  }
	@media (max-width: 365px) {
    font-size: 12px;
  }
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
	background-color: #fff;
//드래그 방지
	-webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
	
}
ol, ul {
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
a{
  text-decoration: none;
  color: inherit;
}

`;

export const Inner = styled.div`
  max-width: 1140px; //원래 1080인데 padding 양쪽 60씩 추가
  width: 100%;
  margin: 0 auto;
  padding: 0 30px;
  &:has(.tab) {
    max-width: 100vw;
    position: -webkit-sticky; /* 사파리 브라우저 지원 */
    position: sticky;
    top: 0;
    z-index: 9999;
    background-color: var(--White);
    border-bottom: 1px solid var(--Gray-30);
  }
  @media (max-width: 530px) {
    max-width: 375px; //모바일
    width: 100%;
    margin: 0 auto;
    padding: 0 15px;
    min-width: 333px;
    /* min-width: 327px; */
    &:has(.RetrospectTitle) {
      max-width: 100vw;
    }
    &:has(.first) {
      border-radius: 0px 0px 20px 20px;
      background: var(--Gray-10, #fafafa);
      box-shadow: 0px 4px 30px 0px rgba(33, 33, 33, 0.05);
      //모바일 커뮤니티 위
    }
    &:has(.changeDate) {
      // 모바일 커뮤니티 아래
      background-color: var(--Gray-20, #f5f5f5);
    }
    &:has(.weekCalendar) {
      max-width: none;
    }
    &:has(.writingBox) {
      padding: 0;
      max-width: 100vw;
    }
  }
`;

export const Flex = styled.div`
  display: flex;
`;
