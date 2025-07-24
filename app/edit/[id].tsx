import { clsx } from "clsx";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Save } from "lucide-react-native";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNoteStore } from "../lib/store";

const colors = [
  "bg-green-100",
  "bg-purple-100",
  "bg-pink-100",
  "bg-yellow-100",
  "bg-sky-100",
  "bg-blue-100",
  "bg-red-100",
  "bg-gray-100",
  "bg-orange-100",
];

export default function EditNoteScreen() {
  const router = useRouter();
  const {
    id,
    title: initialTitle,
    content: initialContent,
    mode,
    color: initialColor,
  } = useLocalSearchParams();

  const [title, setTitle] = useState(initialTitle?.toString() || "");
  const [content, setContent] = useState(initialContent?.toString() || "");
  const { addNote, updateNote } = useNoteStore();

  const handleSave = () => {
    const note = {
      id: id as string,
      title,
      content,
      color:
        initialColor?.toString() ||
        colors[Math.floor(Math.random() * colors.length)],
    };

    if (mode === "edit") {
      updateNote(note);
    } else {
      addNote(note);
    }

    router.back();
  };

  return (
    <SafeAreaView
      className={clsx("flex-1 ", initialColor ? initialColor : "bg-yellow-100")}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <View className="flex-row justify-between items-center p-4">
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSave}>
            <Save size={24} />
          </TouchableOpacity>
        </View>

        <View className="px-4 mt-2">
          <Text className="text-xl font-bold">
            {mode === "edit" ? "Edit Note" : "New Note"}
          </Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Title"
            className="mt-4 text-xl font-bold text-black"
          />
          <TextInput
            value={content}
            onChangeText={setContent}
            placeholder="Write your note..."
            multiline
            className="mt-2 text-base text-black h-96"
            textAlignVertical="top"
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
