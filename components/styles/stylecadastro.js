import { StyleSheet, Dimensions } from 'react-native';

export const getStyles = (isDark) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDark ? '#121212' : '#a9c2e7',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  contentContainer: {
    padding: 20,
    alignItems: 'center',
  },
  keyboardActive: {
    paddingTop: 20,
  },
  logo: {
    width: 200,
    height: 250,
    marginBottom: 20,
    borderRadius: 80,
  },
  title: {
    fontSize: 36,
    fontWeight: '600',
    marginBottom: 30,
    color: isDark ? '#00BFFF' : '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: isDark ? '#2d2d2d' : '#fff',
    borderRadius: 12,
    marginBottom: 15,
    paddingHorizontal: 15,
    width: '100%',
    height: 50,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: isDark ? '#00BFFF' : '#333',
  },
  button: {
    backgroundColor: isDark ? '#FFD700' : '#4a4aa3',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  buttonText: {
    color: isDark ? '#00BFFF' : '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  registerText: {
    fontSize: 14,
    color: isDark ? '#00BFFF' : '#555',
    marginTop: 10,
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
    width: '100%',
    borderWidth: 1,
    borderColor: '#d32f2f',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 14,
  },
});
