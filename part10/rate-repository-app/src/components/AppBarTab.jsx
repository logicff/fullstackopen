import { Pressable, Text, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import theme from '../theme';

const styles = StyleSheet.create({
  tab: {
    padding: 8,
  },
  tabText: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.appBarText,
  },
});

const AppBarTab = ({ title, to }) => {
  return (
    <Link to={to} style={styles.tab} underlayColor="#f0f4f8">
      <Text style={styles.tabText}>{title}</Text>
    </Link>
  );
};

export default AppBarTab;