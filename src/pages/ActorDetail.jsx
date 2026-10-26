import { useEffect, useState } from "react";
import { fetchActorDetail } from "../services/API_Client";
//import ActorSimilarMovieSection from "../components/actor_detail/ActorSimilarMovieSection";
import BackButton from "../components/common/BackButton";
import CircularLoader from "../components/common/CircularLoader";
import ActorSimilarMovieSection from "../components/actor_detail/ActorSimilarMovieSection";

// Age at death if deceased, otherwise current age
const calculateAge = (birthday, deathday) => {
    if (!birthday) return null;
    const birthDate = new Date(birthday);
    const endDate = deathday ? new Date(deathday) : new Date();
    let age = endDate.getFullYear() - birthDate.getFullYear();
    const m = endDate.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && endDate.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};

const getGenderText = (gender) => {
    switch (gender) {
        case 1: return "Female";
        case 2: return "Male";
        case 3: return "Non-binary";
        default: return "Not specified";
    }
};

function ActorDetail({ id }) {
    const [actor, setActor] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        let cancelled = false;
        const loadDetail = async () => {
            try {
                const data = await fetchActorDetail(id);
                if (!cancelled) setActor(data);
            } catch (error) {
                console.error("Error fetching actor details:", error);
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        };

        loadDetail();
        return () => { cancelled = true; };
    }, [id]);

    if (isLoading) return <CircularLoader />;

    if (!actor) {
        return (
            <div className="wrapper text-white py-10">
                <BackButton />
                <p className="text-center py-20">Actor not found.</p>
            </div>
        );
    }

    const age = calculateAge(actor.birthday, actor.deathday);
    const hasInfo =
        actor.birthday || actor.deathday || actor.place_of_birth ||
        actor.gender || actor.known_for_department;

    return (
        <div className="wrapper text-white py-10">
            <BackButton />
            <section className="mt-6">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <img
                        src={actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : "/no-movie.png"}
                        alt={actor.name}
                        decoding="async"
                        className="rounded-xl w-full md:w-100 aspect-video md:aspect-2/3 object-cover shadow-lg shrink-0"
                    />

                    <div className="flex-1">
                        <p className="text-3xl md:text-4xl font-bold mb-4">{actor.name}</p>

                        {hasInfo && (
                            <div className="flex flex-col gap-3 mb-6 bg-dark-100 p-4 rounded-xl border border-light-100/10 text-sm">
                                {actor.birthday && (
                                    <p>
                                        <strong>Birthday:</strong> {actor.birthday}
                                        {age !== null && !actor.deathday && ` (${age} years old)`}
                                    </p>
                                )}
                                {actor.deathday && (
                                    <p>
                                        <strong>Died:</strong> {actor.deathday}
                                        {age !== null && ` (aged ${age})`}
                                    </p>
                                )}
                                {actor.place_of_birth && (
                                    <p><strong>Place of Birth:</strong> {actor.place_of_birth}</p>
                                )}
                                {actor.gender > 0 && (
                                    <p><strong>Gender:</strong> {getGenderText(actor.gender)}</p>
                                )}
                                {actor.known_for_department && (
                                    <p><strong>Known For:</strong> {actor.known_for_department}</p>
                                )}
                            </div>
                        )}

                        <h3 className="text-xl font-bold mb-2">Biography</h3>
                        <p className="text-gray-300 leading-relaxed text-[clamp(0.875rem,0.8rem+0.3vw,1rem)] whitespace-pre-line">
                            {actor.biography || "No biography available for this person."}
                        </p>
                    </div>
                </div>
            </section>
            <ActorSimilarMovieSection actorId={id} />
        </div>
    );
}

export default ActorDetail;