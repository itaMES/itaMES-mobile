import AsyncStorage from '@react-native-community/async-storage';

export class BaseStorage {
	constructor() {
	}

	get = async (key: string) => {
		try {
			const value = await AsyncStorage.getItem(key);
			if (value !== null) {
				return JSON.parse(value);
			}
		} catch (error) {
			// Error retrieving data
		}
	}

	set = async (key: string, value: any) => {
		try {
			await AsyncStorage.setItem(key, JSON.stringify(value));
		} catch (error) {
			// Error saving data
		}
	}

	clear = async () => {
		try {
			await AsyncStorage.clear();
		} catch (error) {
			// Error saving data
		}
	}

	remove = async (key: string) => {
		try {
			await AsyncStorage.removeItem(key);
		} catch (error) {
			// Error saving data
		}
	}
}

export default BaseStorage;