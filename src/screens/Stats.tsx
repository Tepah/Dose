import * as React from "react";
import { Dimensions, Image, ScrollView, Text, View } from "react-native";
import Styles from "../components/Styles";
import { mockProfile1 } from "../test/mockProfile1";
import { ContributionGraph } from "react-native-chart-kit";
import { HabitType } from "../components/types";

const StatsHeader = () => {
  return (
    <View style={Styles.header}>
      <Text style={[Styles.text, Styles.headerText]}>stats</Text>
    </View>
  );
};

const StatsProfileCard = () => {
  const chartData = createChartData();
  return (
    <View style={Styles.statsCardContainer}>
      <Image
        source={mockProfile1.profilePic}
        style={Styles.profileStatsImage}
      />
      <Text style={[Styles.text, Styles.profileStatsText]}>
        {mockProfile1.username}
      </Text>
      <ContributionGraph
        style={{alignSelf: 'center', marginTop: 10}}
        values={chartData}
        endDate={new Date()}
        numDays={90}
        width={Dimensions.get('window').width - 40}
        height={220}
        chartConfig={{
          backgroundColor: '#1D2B3E',
          backgroundGradientFrom: '#344966',
          backgroundGradientTo: '#1D2B3E',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(200, 300, 300, ${opacity})`,
          style: {borderRadius: 10, padding: 10},
        }}
        tooltipDataAttrs={<Text>tbd</Text>}
      />
    </View>
  );
};

const formatDate = (date: string) => {
  const [month, day, year] = date.split('/');
  const newDate = new Date(year, month - 1, day);
  return newDate.toISOString().split('T')[0];
};

const createChartData = () => {
  const chartData: {date: string, count: number}[] = [];

  for (let i = 0; i < mockProfile1.habits.length; i++) {
    Object.keys(mockProfile1.habits[i].progress).forEach(date => {
      let found = false;
      const formattedDate = formatDate(date);

      for (let j = 0; j < chartData.length; j++) {
        if (
          chartData[j].date === formattedDate &&
          mockProfile1.habits[i].progress[date] === true
        ) {
          chartData[j].count += 1;
          found = true;
        }
      }
      if (!found && mockProfile1.habits[i].progress[date] === true) {
        chartData.push({date: formattedDate, count: 1});
      }
    });
  }
  console.log(chartData);
  return chartData;
};

const calculatePercentage = (habit: HabitType) => {
  let total = 0;
  for (let i = 0; i < Object.keys(habit.progress).length; i++) {
    if (habit.progress[Object.keys(habit.progress)[i]]) {
      total++;
    }
  }
  return `${Math.round((total / Object.keys(habit.progress).length) * 100)}%`;
};

const renderHabits = mockProfile1.habits.map((habit: HabitType) => {
  return (
    <View style={Styles.indHabitContainer}>
      <Text style={[Styles.text]}>{calculatePercentage(habit)}</Text>
      <Text style={[Styles.text, Styles.habitNameText]}>{habit.name}</Text>
    </View>
  );
});

const StatsCharts = () => {
  return (
    <View style={Styles.statsCardContainer}>
      <Text style={[Styles.text]}>Habit Activity (30 days)</Text>
      <ScrollView horizontal={true}>{renderHabits}</ScrollView>
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
