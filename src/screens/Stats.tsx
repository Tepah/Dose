import * as React from 'react';
import {Dimensions, Image, ScrollView, Text, View} from 'react-native';
import Styles from '../components/Styles';
import {mockProfileList} from '../test/mockProfile1';
import {ContributionGraph, LineChart} from 'react-native-chart-kit';
import {HabitType} from '../components/types';

const StatsHeader = () => {
  return (
    <View style={Styles.header}>
      <Text style={[Styles.text, Styles.headerText]}>stats</Text>
    </View>
  );
};

const StatsProfileCard = () => {
  const chartData = createChartData();
  const handleToolTip: any = {};
  return (
    <View style={Styles.statsCardContainer}>
      <View style={Styles.statProfileContainer}>
        <Image
          source={mockProfileList['@petah'].profilePic}
          style={Styles.profileStatsImage}
        />
        <View style={Styles.statsProfileTextContainer}>
          <Text style={[Styles.text, Styles.profileStatsText]}>
            {mockProfileList['@petah'].username}
          </Text>
          <Text style={[Styles.paragraphText, Styles.statStartDateText]}>
            Member since {mockProfileList['@petah'].startDate}
          </Text>
        </View>
      </View>
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
        tooltipDataAttrs={() => handleToolTip}
      />
    </View>
  );
};

const formatDate = (date: string) => {
  const [month, day, year] = date.split('/');
  const newDate = new Date(Number(year), Number(month) - 1, Number(day));
  return newDate.toISOString().split('T')[0];
};

const createChartData = () => {
  const chartData: {date: string; count: number}[] = [];

  for (let i = 0; i < mockProfileList['@petah'].habits.length; i++) {
    Object.keys(mockProfileList['@petah'].habits[i].progress).forEach(date => {
      let found = false;
      const formattedDate = formatDate(date);

      for (let j = 0; j < chartData.length; j++) {
        if (
          chartData[j].date === formattedDate &&
          mockProfileList['@petah'].habits[i].progress[date] === true
        ) {
          chartData[j].count += 1;
          found = true;
        }
      }
      if (
        !found &&
        mockProfileList['@petah'].habits[i].progress[date] === true
      ) {
        chartData.push({date: formattedDate, count: 1});
      }
    });
  }
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

const renderHabits = mockProfileList['@petah'].habits.map(
  (habit: HabitType, index: number) => {
    return (
      <View key={index} style={Styles.indHabitContainer}>
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

const WeeklyStats = () => {
  const weekLabels: string[] = [];
  const weekData: number[] = [0, 0, 0, 0, 0, 0, 0];
  const progressKeys = Object.keys(
    mockProfileList['@petah'].habits[0].progress,
  );
  for (let i = progressKeys.length - 1; i > progressKeys.length - 8; i--) {
    const [month, day, year] = progressKeys[i].split('/');
    weekLabels.unshift(month + '/' + day);
    for (let j = 0; j < mockProfileList['@petah'].habits.length; j++) {
      if (mockProfileList['@petah'].habits[j].progress[progressKeys[i]]) {
        weekData[7 - (progressKeys.length - i)]++;
      }
    }
  }
  return (
    <View style={Styles.statsCardContainer}>
      <Text style={[Styles.text]}>Weekly Stats</Text>
      <LineChart
        data={{
          labels: weekLabels,
          datasets: [
            {
              data: weekData,
            },
          ],
        }}
        width={Dimensions.get('window').width - 55}
        height={220}
        fromZero={true}
        chartConfig={{
          backgroundColor: '#1D2B3E',
          backgroundGradientFrom: '#344966',
          backgroundGradientTo: '#1D2B3E',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 255) => `rgba(200, 300, 300, ${opacity})`,
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
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
        <WeeklyStats />
      </ScrollView>
    </View>
  );
};

export default StatsScreen;
