import { clsx } from "clsx";
import { useRouter } from "expo-router";
import { Plus, Trash2 } from "lucide-react-native";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { Note, useNoteStore } from "./lib/store";

export default function HomeScreen() {
  const router = useRouter();
  const { notes, deleteNote } = useNoteStore();

  const handleAdd = () => {
    const newId = Date.now().toString();
    router.push({
      pathname: "/edit/[id]",
      params: { id: newId, mode: "create" },
    });
  };

  const handleEdit = (note: Note) => {
    router.push({
      pathname: "/edit/[id]",
      params: {
        id: note.id,
        title: note.title,
        content: note.content,
        color: note.color,
        mode: "edit",
      },
    });
  };

  const handleDelete = (noteId: string) => {
    Alert.alert("Delete Note", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteNote(noteId),
      },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-4">
      <View className="flex-row justify-between items-center my-4">
        <Text className="text-2xl font-bold">Recent Notes</Text>
        <TouchableOpacity onPress={handleAdd}>
          <Plus size={28} color="black" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        // numColumns={2}
        // columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ gap: 12, paddingBottom: 24 }}
        ItemSeparatorComponent={() => <View className="h-2 bg-transparent" />}
        renderItem={({ item }) => (
          <Animated.View
            entering={FadeIn.duration(400)}
            exiting={FadeOut}
            className={clsx("p-4 rounded-xl", item.color)}
          >
            <TouchableOpacity
              onPress={() => handleEdit(item)}
              className="flex-1"
            >
              <Text className="font-bold text-lg mb-1">{item.title}</Text>
              <Text numberOfLines={5} className="text-sm text-gray-700">
                {item.content}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDelete(item.id)}
              className="absolute top-2 right-2"
            >
              <Trash2 size={18} color="gray" />
            </TouchableOpacity>
          </Animated.View>
        )}
      />
    </SafeAreaView>
  );
}
