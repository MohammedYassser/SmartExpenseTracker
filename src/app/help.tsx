import { router, Stack } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import AppIcon from '@/components/AppIcon';
import { Colors, ui } from '@/constants/styles';

const guideGroups = [
  {
    title: 'Getting Started',
    sections: [
      {
        title: 'Dashboard', icon: 'wallet', summary: 'Your finances at a glance.',
        paragraphs: [
          'The Dashboard shows your total balance, total income, total expenses and recent transactions. Balance is income minus expenses.',
          'Use the quick actions to add a transaction, view Transactions or open Budget. Tap a recent transaction for its details, or the profile icon to open Profile.',
        ],
      },
      {
        title: 'Transactions', icon: 'transactions', summary: 'Manage your income and expenses.',
        paragraphs: [
          'Open the Transactions tab to view your list. Search by category, note or date.',
          'Choose Add Transaction, select Expense or Income, and enter a positive amount, category and date in YYYY-MM-DD format. A note is optional. Tap Add Transaction to save.',
          'Tap a transaction to view its details. To make changes, use Edit below that transaction on the Transactions list, then save your changes.',
          'Use Delete on the transaction card to begin deletion. Confirm Delete removes it; Cancel keeps it.',
        ],
      },
      {
        title: 'Budgets', icon: 'wallet', summary: 'Set spending limits and track progress.',
        paragraphs: [
          'Open Budget and choose Add Budget. Select Food, Transport, Shopping or Entertainment, or choose Other and enter a custom category name. Enter a positive Budget Amount and tap Save Budget.',
          'Budget cards show your limit, spending, remaining amount and progress. Spending comes from expense transactions with a matching category; income does not count toward spending.',
          'Tap a budget card to open Budget Details. Choose Edit Budget to change its category or limit. Choose Delete Budget and confirm Delete to remove it, or Cancel to keep it.',
          'Budget exceeded means spending in that category is higher than the limit. The remaining amount becomes negative.',
        ],
      },
    ],
  },
  {
    title: 'Understand Your Finances',
    sections: [
      {
        title: 'Reports', icon: 'transactions', summary: 'General financial and budget analysis.',
        paragraphs: [
          'The Reports tab gives a broader view of your income, expenses, net balance and transaction counts.',
          'Review spending by category, your top spending category and budget-related totals. Choose Monthly Summary to review a particular month.',
        ],
      },
      {
        title: 'Transaction Statistics', icon: 'info', summary: 'Overall transaction behavior across all dates.',
        paragraphs: [
          'Open Transactions and tap Statistics. This screen shows total transactions, the average transaction amount, income and expense counts, highest income and highest expense.',
          'It also compares income and expenses and shows overall category spending. The average includes both income and expense amounts. These are overall statistics, not a report for a specific month.',
        ],
      },
      {
        title: 'Monthly Summary', icon: 'wallet', summary: 'Financial activity for a selected month.',
        paragraphs: [
          'Open Reports and choose Monthly Summary. Use the previous and next arrows to select a month.',
          'Only transactions dated in the selected month and year contribute to monthly income, expenses, net balance, transaction counts, category spending and largest transactions.',
          'If the month has no transactions, an empty message appears. You can select another month or use View Transactions to return to the list.',
        ],
      },
    ],
  },
  {
    title: 'Profile & Access',
    sections: [
      {
        title: 'Profile & Settings', icon: 'profile', summary: 'Demo profile and application preferences.',
        paragraphs: [
          'Open Profile using the Dashboard profile icon. The profile information is currently for demonstration. Settings and Log Out are available from Profile.',
          'Settings displays currency, language and theme information. The Notifications switch is a local demo preference only: it does not send notifications and is not saved.',
          'Open About SmartExpenseTracker for application and project information, or Help & Support for this guide.',
        ],
      },
      {
        title: 'Login & Sign Up', icon: 'profile', summary: 'Local preview screens, without online accounts.',
        paragraphs: [
          'Login accepts any non-empty email and password to enter the app preview. Sign Up checks the required fields and matching passwords, then returns you to Login.',
          'These are demo screens. No real online account is created, no backend authentication takes place, and credentials are not saved or synchronized. Log Out returns you to Login.',
        ],
      },
    ],
  },
] as const;

const faqs = [
  { question: 'How do I add a transaction?', answer: 'In Transactions, tap Add Transaction. Choose Expense or Income, enter an amount, category and date, optionally add a note, then tap Add Transaction to save.' },
  { question: 'How do I edit a transaction?', answer: 'In the Transactions list, find the transaction and tap Edit below it. Update the fields and tap Save Changes. Tapping the transaction itself opens its details.' },
  { question: 'How do I delete a transaction?', answer: 'Tap Delete below the transaction in the list, then Confirm Delete. Choose Cancel if you want to keep it.' },
  { question: 'How do I create a budget?', answer: 'Open Budget, tap Add Budget, choose a category and enter a positive spending limit. Tap Save Budget.' },
  { question: 'Can I create my own budget category?', answer: 'Yes. In the budget form, choose Other and enter a Custom Category such as Pet Care. A non-empty category name is required; the name you enter is saved with the budget.' },
  { question: 'Where can I see my spending analysis?', answer: 'Reports provides general financial, category and budget analysis. Statistics, accessed from Transactions, shows overall transaction behavior. Monthly Summary, accessed from Reports, shows activity for one selected month.' },
];

export default function HelpScreen() {
  const [expandedGuide, setExpandedGuide] = useState<string | null>('Dashboard');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  function returnToSettings() {
    if (router.canGoBack()) router.back();
    else router.replace('/settings');
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: 'Help & Support' }} />
      <ScrollView style={ui.container} contentContainerStyle={styles.content}>
        <View style={ui.iconBadge}><AppIcon name="help" /></View>
        <Text style={ui.title}>How can we help?</Text>
        <Text style={ui.subtitle}>Get to know SmartExpenseTracker. Tap a topic or question to read more.</Text>

        {guideGroups.map((group) => (
          <View key={group.title} style={styles.group}>
            <Text style={ui.sectionTitle}>{group.title}</Text>
            <View style={styles.card}>
              {group.sections.map((section, index) => {
                const expanded = expandedGuide === section.title;
                return (
                  <View key={section.title} style={index > 0 && styles.divider}>
                    <Pressable accessibilityRole="button" accessibilityLabel={section.title} aria-expanded={expanded} onPress={() => setExpandedGuide(expanded ? null : section.title)} style={({ pressed }) => [styles.topic, pressed && ui.pressed]}>
                      <View style={ui.iconBadge}><AppIcon name={section.icon} size={18} /></View>
                      <View style={styles.topicText}>
                        <Text style={styles.topicTitle}>{section.title}</Text>
                        <Text style={styles.caption}>{section.summary}</Text>
                      </View>
                      <View style={expanded && styles.expandedIcon}><AppIcon name="forward" size={16} /></View>
                    </Pressable>
                    {expanded ? (
                      <View style={styles.answer}>
                        {section.paragraphs.map((paragraph) => <Text key={paragraph} style={styles.body}>{paragraph}</Text>)}
                      </View>
                    ) : null}
                  </View>
                );
              })}
            </View>
          </View>
        ))}

        <Text style={[ui.sectionTitle, styles.faqHeading]}>Frequently Asked Questions</Text>
        <View style={styles.card}>
          {faqs.map((faq, index) => {
            const expanded = expandedFaq === faq.question;
            return (
              <View key={faq.question} style={index > 0 && styles.divider}>
                <Pressable accessibilityRole="button" accessibilityLabel={faq.question} aria-expanded={expanded} onPress={() => setExpandedFaq(expanded ? null : faq.question)} style={({ pressed }) => [styles.topic, pressed && ui.pressed]}>
                  <Text style={[styles.topicTitle, styles.topicText]}>{faq.question}</Text>
                  <View style={expanded && styles.expandedIcon}><AppIcon name="forward" size={16} /></View>
                </Pressable>
                {expanded ? <Text style={[styles.body, styles.faqAnswer]}>{faq.answer}</Text> : null}
              </View>
            );
          })}
        </View>

        <Pressable accessibilityRole="button" onPress={returnToSettings} style={({ pressed }) => [ui.secondaryButton, styles.back, pressed && ui.pressed]}>
          <Text style={ui.link}>Back to Settings</Text>
        </Pressable>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  content: { ...ui.content, gap: 14 },
  group: { gap: 12, marginTop: 12 },
  card: { ...ui.card, paddingVertical: 0 },
  topic: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 18, minHeight: 56 },
  topicText: { flex: 1, gap: 4 },
  topicTitle: { fontSize: 15, lineHeight: 22, fontWeight: '600', color: Colors.text },
  caption: { ...ui.subtitle, fontSize: 13, lineHeight: 20 },
  divider: { borderTopWidth: 1, borderTopColor: Colors.border },
  answer: { gap: 12, paddingBottom: 18 },
  body: { ...ui.subtitle, fontSize: 14, lineHeight: 23 },
  expandedIcon: { transform: [{ rotate: '90deg' }] },
  faqHeading: { marginTop: 12 },
  faqAnswer: { paddingBottom: 18 },
  back: { marginTop: 12 },
});
