import styled, { css } from 'styled-components'

const SinchonColor = css`color: #009D3E;`
const NotoSansBold = css`
    font-family: 'Noto Sans KR';
    font-weight: 700;
`
const KeepCalmPreset = css`
    font-family: 'KeepCalmMed';
    font-weight: normal;
`

const TitleWrap_ = styled.div`

`

const Title = styled.h1`
    ${KeepCalmPreset}
    ${SinchonColor}
    font-size: 2.6em;
    letter-spacing: -0.08rem;
    
    line-height: 1.2;
    
    margin: 0;
    @media(max-width: 470px){
        font-size: 2.6rem;

    }
    @media(max-width: 400px){

    }
`

const SubTitle = styled.p`
    ${SinchonColor}

    margin: 0 0 3rem 0;

    @media(max-width: 470px){
        font-size: 1rem;
    }
    @media(max-width: 320px){
        font-size: 1rem;
    }
`

const TitleWrap = ({ title, isSuapc, year, season }) => {
    return (
        <TitleWrap_>
            <Title>{title}</Title>
            {isSuapc ?
                <SubTitle css={NotoSansBold}>{year} 신촌지역 대학교 <br className="show-if-small" />프로그래밍 동아리 <br className="show-if-mobile" />연합 {season === "Winter" ? "겨울" : "여름"} 대회</SubTitle>
                :
                <SubTitle>{year} ICPC Sinchon {season} Algorithm Camp Contest</SubTitle>
            }
        </TitleWrap_>
    )
}

export default TitleWrap