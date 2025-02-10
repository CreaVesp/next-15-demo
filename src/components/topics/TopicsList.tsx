import Link from "next/link";
import {Chip} from "@heroui/chip";
import {db} from "@/db";
import paths from "@/paths";

export default async function TopicsList() {
    const topics = await db.topic.findMany()

    const renderedTopics = topics.map(t => (
        <div key={t.id}>
            <Link href={paths.topicShow(t.slug)}>
                <Chip color={'warning'} variant={'shadow'}>{t.slug}</Chip>
            </Link>
        </div>
    ))

    return <div className={'flex flex-row flex-wrap gap-2'}>
        {renderedTopics}
    </div>
}