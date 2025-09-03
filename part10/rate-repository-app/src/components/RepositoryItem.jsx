import { View, Image, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: theme.colors.itemBackground,
  },
  baseContainer: {
    flexDirection: 'row',
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  tagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 2,
  },
  languageTag: {
    color: '#ffffff',
    backgroundColor: theme.colors.primary,
    padding: 4,
    borderRadius: 4,
    fontWeight: theme.fontWeights.bold,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingHorizontal: 12,
    maxWidth: 600,
  },
  detailItem: {
    alignItems: 'center',
  },
});

const RepositoryItem = ({ item }) => {
  const counts = (count) => {
    if (count >= 1000) {
      displayed = (count / 1000).toFixed(1);
      return `${displayed}k`;
    } else {
      return `${count}`;
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.baseContainer}>
        <Image
          source={{ uri: item.ownerAvatarUrl }}
          style={styles.avatar}
          resizeMode="cover"
        />
        <View style={styles.infoContainer}>
          <Text fontWeight="bold" fontSize="subheading">{item.fullName}</Text>
          <Text color="textSecondary">{item.description}</Text>
          <View style={styles.tagContainer}>
            <Text style={styles.languageTag}>{item.language}</Text>
          </View>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Text fontWeight="bold">{counts(item.stargazersCount)}</Text>
          <Text color="textSecondary">Stars</Text>
        </View>
        <View style={styles.detailItem}>
          <Text fontWeight="bold">{counts(item.forksCount)}</Text>
          <Text color="textSecondary">Forks</Text>
        </View>
        <View style={styles.detailItem}>
          <Text fontWeight="bold">{counts(item.reviewCount)}</Text>
          <Text color="textSecondary">Reviews</Text>
        </View>
        <View style={styles.detailItem}>
          <Text fontWeight="bold">{counts(item.ratingAverage)}</Text>
          <Text color="textSecondary">Rating</Text>
        </View>
      </View>
    </View>
  )
}

export default RepositoryItem;