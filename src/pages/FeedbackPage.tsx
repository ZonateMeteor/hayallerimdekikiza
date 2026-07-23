import { useEffect, useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { supabase } from "../lib/supabase";
import { Send } from "lucide-react";

interface Feedback {
  id: string;
  name: string | null;
  message: string;
  created_at: string;
}

export function FeedbackPage({ onBack }: { onBack: () => void }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("feedbacks")
      .select("id, name, message, created_at")
      .order("created_at", { ascending: false });
    if (error) setError("Geri bildirimler yüklenemedi.");
    else setFeedbacks((data ?? []) as Feedback[]);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;
    setSubmitting(true);
    setError(null);
    const { error } = await supabase.from("feedbacks").insert({
      name: name.trim() || null,
      message: message.trim(),
    });
    setSubmitting(false);
    if (error) {
      setError("Gönderilemedi, tekrar dene.");
      return;
    }
    setMessage("");
    setName("");
    load();
  }

  return (
    <div className="app-bg min-h-screen">
      <PageHeader title="Geri Bildirim" onBack={onBack} />
      <div className="mx-auto w-full max-w-xl px-4 py-8">
        <form onSubmit={submit} className="surface mb-6 rounded-2xl p-5">
          <h2 className="mb-4 text-lg font-semibold">Geri bildirim yaz</h2>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="İsmin (opsiyonel)"
            maxLength={40}
            className="surface mb-3 w-full rounded-xl px-4 py-2.5 outline-none"
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Mesajın..."
            rows={4}
            maxLength={500}
            required
            className="surface mb-3 w-full resize-none rounded-xl px-4 py-2.5 outline-none"
          />
          {error && <p className="mb-3 text-sm" style={{ color: "#ef4444" }}>{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="bg-primary flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 font-semibold text-white transition disabled:opacity-50"
          >
            <Send size={16} />
            {submitting ? "Gönderiliyor..." : "Gönder"}
          </button>
        </form>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted">Geri Bildirimlerim</h3>
          {loading ? (
            <p className="text-muted text-sm">Yükleniyor...</p>
          ) : feedbacks.length === 0 ? (
            <p className="text-muted text-sm">Henüz geri bildirim yok.</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {feedbacks.map((f) => (
                <li key={f.id} className="surface rounded-xl p-4">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="font-medium">{f.name ?? "Anonim"}</span>
                    <span className="text-muted text-xs">
                      {new Date(f.created_at).toLocaleDateString("tr-TR")}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed">{f.message}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
