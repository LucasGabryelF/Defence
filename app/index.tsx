import { Redirect } from 'expo-router';

export default function RootScreen() {
  
  return (
    <Redirect href={"/sign-in"}></Redirect>
  );
}
