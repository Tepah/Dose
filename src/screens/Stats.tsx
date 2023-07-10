import * as React from 'react';
import { View, Text, ScrollView, Image } from "react-native";
import Styles from '../components/Styles';
import { mockProfile1 } from "../test/mockProfile1";
import { ContributionGraph } from "react-native-chart-kit";

const StatsHeader = () => {
  return (
    <View style={Styles.header}>
      <Text style={[Styles.text, Styles.headerText]}>stats</Text>
    </View>
  );
};

const StatsProfileCard = () => {
  return (
    <View style={Styles.statsCardContainer}>
      <Image
        source={mockProfile1.profilePic}
        style={Styles.profileStatsImage}
      />
      <Text style={[Styles.text, Styles.profileStatsText]}>
        {mockProfile1.username}
      </Text>
    </View>
  );
};

const StatsCharts = () => {
  const chartData: {date: string, count: number}[] = [];

  for (let i = 0; i < mockProfile1.habits.length; i++) {
    Object.keys(mockProfile1.habits[i].progress).forEach((date) => {
      for (let j = 0; j < chartData.length; j++) {
        if (chartData[j].date === date) {
          chartData[j].count += 1;
        }
      }
      chartData.push({date: date, count: 1});
    });
  }

  const getTooltipDataAttrs = ({value, date}) => {
    return {
      'data-tooltip': `${value} completions on ${date}`,
    };
  };

    return (
    <View style={Styles.statsCardContainer}>
      <Text style={[Styles.text]}>Progress</Text>
      <ContributionGraph
        values={chartData}
        endDate={new Date()}
        numDays={30}
        width={300}
        height={220}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {borderRadius: 16},
        }}
       tooltipDataAttrs={getTooltipDataAttrs}
      />
    </View>
  );
};

const StatsScreen = () => {
  return (
    <View style={Styles.app}>
      <StatsHeader />
      <ScrollView style={Styles.statsContainer}>
        <StatsProfileCard />
        <StatsCharts />
      </ScrollView>
    </View>
  );
};

export default StatsScreen;
