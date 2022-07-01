import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PagerView from 'react-native-pager-view';
import { SafeAreaView } from 'react-native-safe-area-context';

export const MyTest = () => {
    return (
        <SafeAreaView style={styles.pagerView}>
            <PagerView style={styles.pagerView} initialPage={0}>
                <View key="1">
                    <Text>First page</Text>
                </View>
                <View key="2">
                    <Text>Second page</Text>
                </View>
            </PagerView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    pagerView: {
        flex: 1,
    },
});