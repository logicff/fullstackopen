import Text from './Text';
import { TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';

import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: theme.colors.itemBackground,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    height: 50,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.subheading,
  },
  inputInvalid: {
    borderColor: '#d73a4a', // 红色边框表示错误
  },
  button: {
    marginTop: 12,
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
  },
  buttonPressed: {
    backgroundColor: theme.colors.pressed,
  },
});

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username cannot exceed 20 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password cannot exceed 20 characters'),
});

const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            formik.touched.username && formik.errors.username && styles.inputInvalid
          ]}
          placeholder="Username"
          value={formik.values.mass}
          onChangeText={formik.handleChange('username')}
          error={!!(formik.touched.username && formik.errors.username)}
        />
        {formik.touched.username && formik.errors.username && (
          <Text style={{ color: 'red' }}>{formik.errors.username}</Text>
        )}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            formik.touched.password && formik.errors.password && styles.inputInvalid
          ]}
          placeholder="Password"
          secureTextEntry
          value={formik.values.height}
          onChangeText={formik.handleChange('password')}
          error={!!(formik.touched.password && formik.errors.password)}
        />
        {formik.touched.password && formik.errors.password && (
          <Text style={{ color: 'red' }}>{formik.errors.password}</Text>
        )}
      </View>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed
        ]}
        onPress={formik.handleSubmit}
      >
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };
  return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;