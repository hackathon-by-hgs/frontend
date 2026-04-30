import { View, Text, ScrollView } from 'react-native'
import { theme } from '@/theme'

export default function ProfileRoute() {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ flex: 1, backgroundColor: theme.colors.background.primary }}>
      <View style={{ paddingHorizontal: theme.spacing[16], paddingVertical: theme.spacing[24] }}>
        <Text style={{ fontSize: theme.typography.fontSize['2xl'], fontWeight: theme.typography.fontWeight.bold, color: theme.colors.text.primary }}>
          Profile
        </Text>
        <Text style={{ color: theme.colors.text.secondary, marginTop: theme.spacing[8] }}>
          Profile screen - coming soon
        </Text>
      </View>
    </ScrollView>
  )
}
