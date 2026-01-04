import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";

export default function QueueCard({ queueNumber }) {
  const [currentQueue, setCurrentQueue] = useState(1);

  const remaining = Math.max(queueNumber - currentQueue, 0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQueue((prev) => {
        if (prev >= queueNumber) return queueNumber;
        return prev + 1;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [queueNumber]);

  return (
    <View style={styles.queueWrapper}>
      <View style={styles.queueBox}>
        <Text style={styles.queueTitle}>NOMOR ANTRIAN ANDA</Text>
        <Text style={styles.queueNumber}>{queueNumber}</Text>
      </View>

      <Text style={styles.queueInfo}>
        Antrian Sekarang : {currentQueue}
      </Text>

      <Text style={styles.queueInfo}>
        Antrian Tersisa : {remaining}
      </Text>

      {remaining === 0 && (
        <Text style={styles.calledText}>Giliran Anda</Text>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  queueWrapper: {
    backgroundColor: "#B7C9FF",
    paddingVertical: 50,
    alignItems: "center",
    borderRadius: 16,
    marginTop: 16,
  },

  queueBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 26,
    alignItems: "center",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#1F5BFF",
  },

  queueTitle: {
    fontSize: 12,
    color: "#1F5BFF",
  },

  queueNumber: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1F5BFF",
    marginTop: 2,
  },

  queueInfo: {
    fontSize: 12,
    color: "#1F5BFF",
    marginTop: 2,
  },

  calledText: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: "700",
    color: "#2ECC71",
  },
});
