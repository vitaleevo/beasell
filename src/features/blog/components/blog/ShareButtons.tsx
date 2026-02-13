"use client";

import { Facebook, Twitter, Linkedin, Copy } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { toast } from "sonner";

export default function ShareButtons({ url, title }: { url: string; title: string }) {
    const copyToClipboard = () => {
        navigator.clipboard.writeText(url);
        toast.success("Link copiado!", {
            description: "O link do artigo foi copiado para a área de transferência.",
        });
    };

    return (
        <div className="flex flex-wrap gap-2 mb-8">
            <Button
                variant="outline"
                size="sm"
                onClick={() =>
                    window.open(
                        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
                        "_blank"
                    )
                }
            >
                <Facebook className="h-4 w-4 mr-2" />
                Facebook
            </Button>
            <Button
                variant="outline"
                size="sm"
                onClick={() =>
                    window.open(
                        `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(
                            title
                        )}`,
                        "_blank"
                    )
                }
            >
                <Twitter className="h-4 w-4 mr-2" />
                Twitter
            </Button>
            <Button
                variant="outline"
                size="sm"
                onClick={() =>
                    window.open(
                        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
                        "_blank"
                    )
                }
            >
                <Linkedin className="h-4 w-4 mr-2" />
                LinkedIn
            </Button>
            <Button variant="outline" size="sm" onClick={copyToClipboard}>
                <Copy className="h-4 w-4 mr-2" />
                Copiar Link
            </Button>
        </div>
    );
}
