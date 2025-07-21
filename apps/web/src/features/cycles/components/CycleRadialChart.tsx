import { ChartConfig, ChartContainer } from "@pipu/ui/components";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts";

type CycleAssessmentRadialChartProps = {
  totalParticipants?: number;
  participants?: number;
};

const CycleRadialChart = ({
  totalParticipants = 0,
  participants = 0,
}: CycleAssessmentRadialChartProps) => {
  const chartData = [{ participants: participants, fill: "var(--chart-blue)" }];
  const percentage = ((participants / totalParticipants) * 100).toFixed(0);
  const startAngle = 280;
  const endAngle =
    startAngle + (participants / totalParticipants) * (-90 - startAngle);

  const chartConfig = {
    amount: {
      label: "Amount of participants",
    },
  } satisfies ChartConfig;

  return (
    <div className="flex flex-col items-center gap-2">
      <ChartContainer
        config={chartConfig}
        className="aspect-square min-h-[150px]"
      >
        <ResponsiveContainer aspect={0.8}>
          <RadialBarChart
            data={chartData}
            startAngle={startAngle}
            endAngle={endAngle}
            innerRadius={80}
            outerRadius={110}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="participants" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {percentage}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-lg"
                        >
                          total
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ResponsiveContainer>
      </ChartContainer>
      <p className="text-muted-foreground text-[12px]">
        {" "}
        {participants} das {totalParticipants} pessoas{" "}
      </p>
    </div>
  );
};

export { CycleRadialChart };
