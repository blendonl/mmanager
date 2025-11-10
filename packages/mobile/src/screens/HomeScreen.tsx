import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';

export function HomeScreen() {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge">Total Balance</Text>
          <Text variant="headlineMedium" style={styles.balance}>
            $0.00
          </Text>
        </Card.Content>
      </Card>

      <View style={styles.buttonContainer}>
        <Button mode="contained" style={styles.actionButton}>
          Add Income
        </Button>
        <Button mode="contained" style={styles.actionButton}>
          Add Expense
        </Button>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium">Recent Transactions</Text>
          <Text style={styles.placeholder}>No transactions yet</Text>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  balance: {
    marginTop: 8,
    color: '#2e7d32',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  placeholder: {
    marginTop: 8,
    color: '#999',
    fontStyle: 'italic',
  },
});
