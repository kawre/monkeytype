import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { NextPage } from "next";
import { Line } from "react-chartjs-2";
import styled from "styled-components";
import { useRoom } from "../../contexts/room.context";
import { theme } from "../../styles/theme";
import Text from "../Text";
// Types -------------------------------------------------------------------------

interface Props {}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      mode: "nearest",
      intersect: false,
    },
    legend: {
      display: false,
    },
    filler: {
      propagate: true,
    },
  },
  scales: {
    y: {
      ticks: {
        autoSkip: true,
        maxTicksLimit: 8,
      },
      beginAtZero: true,
      title: {
        text: "wpm",
        color: theme.colors.teal[500],
        font: {
          size: 16,
          family: theme.font,
        },
        display: true,
      },
    },
    x: {
      ticks: {
        autoSkip: true,
        maxTicksLimit: 8,
      },
      title: {
        text: "time",
        color: theme.colors.teal[500],
        font: {
          size: 16,
          family: theme.font,
        },
        display: true,
      },
    },
  },
};

// Component ---------------------------------------------------------------------
const Results: NextPage<Props> = () => {
  const { history } = useRoom();
  const { stats, state } = useRoom();

  const data = {
    labels: history.map(({ time }) => time),
    datasets: [
      {
        label: "wpm",
        data: history.map(({ wpm }) => wpm),
        borderColor: theme.colors.teal[500],
        backgroundColor: `${theme.colors.teal[500]}0A`,
        pointBackgroundColor: theme.colors.teal[400],
        tension: 0.5,
        fill: true,
      },
    ],
  };

  return (
    <Wrapper>
      <ChartWrapper>
        <Stats>
          <StatsWrap>
            <StatsHeading>wpm</StatsHeading>
            <StatsText>{Math.round(stats.wpm)}</StatsText>
          </StatsWrap>
          <StatsWrap>
            <StatsHeading>acc</StatsHeading>
            <StatsText>95%</StatsText>
          </StatsWrap>
          <StatsWrap>
            <StatsHeading>time</StatsHeading>
            <StatsText>{state.time}s</StatsText>
          </StatsWrap>
        </Stats>
        <TopWrapper>
          <Chart>
            {/* @ts-ignore */}
            <Line data={data} options={options} />
          </Chart>
        </TopWrapper>
      </ChartWrapper>
      <Elo></Elo>
    </Wrapper>
  );
};

export default Results;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  margin: auto;
`;

const ChartWrapper = styled.div`
  padding: 0 2rem;
`;

const TopWrapper = styled.div`
  height: 20rem;
  display: flex;
`;

const Chart = styled.div`
  /* width: 60rem; */
  width: 100%;
  height: 100%;
`;

const Stats = styled.div`
  width: 100%;
  padding: 0 2rem;
  padding-bottom: 1rem;
  display: flex;
  justify-content: space-between;
`;

const StatsWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
`;

const StatsHeading = styled(Text)`
  font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  color: ${({ theme }) => theme.colors.teal[500]};
  line-height: 1;
`;

const StatsText = styled(Text)`
  font-size: ${({ theme }) => theme.fontSizes["5xl"]};
  line-height: 1;
`;

const Elo = styled.div`
  margin-top: 2rem;

  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.neutral[800]};
  border-radius: ${({ theme }) => theme.rounded.md};
`;
