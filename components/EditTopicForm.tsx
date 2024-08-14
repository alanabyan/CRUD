"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";


export default function EditTopicForm({ id, title, description }: { id: string; title: string; description: string }) {

    const [newTitle, setNewTitle] = useState(title)
    const [newDescription, setNewDescription] = useState(description);

    const router = useRouter();

    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({newTitle, newDescription}),

            })

            if (!res.ok) {
                throw new Error("Failed to update topic");
            }

            router.push('/');
            router.refresh();
        } catch (error) {
            console.log(error)
        }
    }

    return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input onChange={(event) => setNewTitle(event.target.value)} value={newTitle} className="border border-slate-500 px-8 py-2" type="text" placeholder="Topic Tittle" />
        <input onChange={(event) => setNewDescription(event.target.value)} value={newDescription} className="border border-slate-500 px-8 py-2" type="text" placeholder="Topic Description" />
        <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">Update Topic</button>
    </form>
    )
}