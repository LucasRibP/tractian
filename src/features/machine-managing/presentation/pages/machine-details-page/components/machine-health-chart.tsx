import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { FC } from "react";
import styled from "styled-components";
import HCSoldGauge from "highcharts/modules/solid-gauge";
import * as ChartModuleMore from "highcharts/highcharts-more.js";

ChartModuleMore.default(Highcharts);
HCSoldGauge(Highcharts);

const MachineHealthChart: FC<{ percentage: number }> = ({ percentage }) => {
  let chartOptions = {
    chart: {
      type: "solidgauge",
    },

    title: "teste",

    pane: {
      center: ["50%", "85%"],
      size: "100%",
      startAngle: -90,
      endAngle: 90,
      background: {
        backgroundColor: "#EEE",
        innerRadius: "60%",
        outerRadius: "100%",
        shape: "arc",
      },
    },

    exporting: {
      enabled: false,
    },

    tooltip: {
      enabled: false,
    },

    // the value axis
    yAxis: {
      stops: [
        [0.2, "#DF5353"], // red
        [0.5, "#DDDF0D"], // yellow
        [0.8, "#55BF3B"], // green
      ],
      lineWidth: 0,
      tickWidth: 0,
      minorTickInterval: null,
      tickAmount: 2,
      labels: {
        y: 16,
      },
      min: 0,
      max: 100,
      title: {
        text: "Saúde",
      },
    },

    plotOptions: {
      solidgauge: {
        dataLabels: {
          y: 5,
          borderWidth: 0,
          useHTML: true,
        },
      },
    },

    credits: {
      enabled: false,
    },

    series: [
      {
        name: "Health",
        data: [percentage],
        dataLabels: {
          format:
            '<div style="text-align:center">' +
            '<span style="font-size:25px">{y}%</span><br/>' +
            "</div>",
        },
      },
    ],
  };
  return (
    <ChartContainer>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </ChartContainer>
  );
};

const ChartContainer = styled.div``;

export default MachineHealthChart;
