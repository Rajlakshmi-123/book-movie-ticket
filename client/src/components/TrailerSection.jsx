import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { PlayCircle, ExternalLink, X } from "lucide-react";
import { dummyTrailers, dummyShowsData, assets } from "../assets/assets";
import backgroundImage from "../assets/backgroundImage.png";
import BlurCircle from "./BlurCircle";

const TrailerSection = ({ selectedMovieId }) => {
  const [currentTrailer, setCurrentTrailer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef(null);

  useEffect(() => {
    // When movie changes, load its trailer(s) and thumbnail
    if (selectedMovieId == null) {
      // default to first global trailer
      const t = dummyTrailers[0];
      setCurrentTrailer(augmentTrailerWithThumb(t));
      setIsPlaying(false);
      return;
    }

    const trailersForMovie = dummyTrailers.filter((t) => String(t.movieId) === String(selectedMovieId));
    const movie = dummyShowsData.find((m) => String(m.id) === String(selectedMovieId) || String(m._id) === String(selectedMovieId));

    if (trailersForMovie.length > 0) {
      // pick the first trailer by default
      setCurrentTrailer(augmentTrailerWithThumb(trailersForMovie[0], movie));
    } else if (movie) {
      // build a fallback currentTrailer from movie data
      setCurrentTrailer({
        movieId: movie.id || movie._id,
        title: movie.title,
        studio: movie.tagline || "",
        image: movie.backdrop_path || movie.poster_path || assets.screenImage,
        videoUrl: null,
      });
    } else {
      setCurrentTrailer(augmentTrailerWithThumb(dummyTrailers[0]));
    }

    setIsPlaying(false);
  }, [selectedMovieId]);

  // Helpers
  function extractYouTubeId(url) {
    if (!url) return null;
    const vMatch = url.match(/[?&]v=([^&]+)/);
    if (vMatch && vMatch[1]) return vMatch[1];
    const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
    if (shortMatch && shortMatch[1]) return shortMatch[1];
    const embedMatch = url.match(/embed\/([^?&]+)/);
    if (embedMatch && embedMatch[1]) return embedMatch[1];
    return null;
  }

  function getYouTubeThumbUrls(videoUrl) {
    const id = extractYouTubeId(videoUrl);
    if (!id) return null;
    return {
      max: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
      hq: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
    };
  }

  function augmentTrailerWithThumb(trailer, movie) {
    const mv = movie || dummyShowsData.find((m) => String(m.id) === String(trailer.movieId) || String(m._id) === String(trailer.movieId));
    const yt = trailer?.videoUrl ? getYouTubeThumbUrls(trailer.videoUrl) : null;
    const image = trailer?.image || (yt && yt.max) || mv?.backdrop_path || mv?.poster_path || assets.screenImage;
    return {
      ...trailer,
      title: trailer?.title || mv?.title || "Trailer",
      studio: mv?.tagline || "",
      image,
    };
  }

  // Determine list of thumbnails to show under the hero: all trailers for movie, or global list
  const thumbnailsList = selectedMovieId
    ? dummyTrailers.filter((t) => String(t.movieId) === String(selectedMovieId)).map((t) => augmentTrailerWithThumb(t))
    : dummyTrailers.map((t) => augmentTrailerWithThumb(t));

  // Click thumbnail
  function handleSelectThumbnail(trailer) {
    setCurrentTrailer(trailer);
    setIsPlaying(false);
  }

  // Play hero
  function handlePlay() {
    if (!currentTrailer?.videoUrl) return;
    setIsPlaying(true);
  }

  // Close player
  function handleClose() {
    setIsPlaying(false);
    // stop playback by resetting player if needed
    if (playerRef.current && playerRef.current.seekTo) {
      try { playerRef.current.seekTo(0); } catch (e) {}
    }
  }

  if (!currentTrailer) return null;

  return (
    <section className="relative overflow-hidden py-12 px-4 md:px-8 lg:px-16 bg-cover bg-center text-white" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="absolute inset-0 bg-black/70 pointer-events-none" />
      <div className="relative z-10 mx-auto max-w-300">
        <div className="mb-6">
          <p className="font-medium uppercase tracking-wider mb-2 text-white">Trailers</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">{currentTrailer.title}</h2>
              {currentTrailer.studio && <p className="text-sm text-white/80 mt-1">{currentTrailer.studio}</p>}
            </div>
          </div>
        </div>

        {/* Hero area */}
        <div
          className="rounded-2xl overflow-hidden bg-black"
          style={{
            backgroundImage: currentTrailer?.image ? `url(${currentTrailer.image})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="relative rounded-2xl overflow-hidden">
            <div className="aspect-video w-full relative">
              {/* Thumbnail view (shown when not playing) */}
              {!isPlaying && (
                <>
                  <img
                    src={currentTrailer.image}
                    alt={currentTrailer.title}
                    className="w-full h-full object-cover opacity-0"
                    onError={(e) => { e.currentTarget.src = assets.screenImage; }}
                  />

                  {/* dark gradient overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Center Play button */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <button
                      onClick={handlePlay}
                      className={`flex items-center justify-center rounded-full bg-white p-4 shadow-2xl transform transition-transform duration-300 hover:scale-105 ${currentTrailer.videoUrl ? "" : "opacity-60 cursor-not-allowed"}`}
                      aria-label="Play trailer"
                    >
                      <PlayCircle className="w-8 h-8 text-black" />
                    </button>
                  </div>

                  {/* Title top-left on thumbnail */}
                  <div className="absolute top-4 left-4 text-left z-20">
                    <p className="text-sm uppercase tracking-wider text-white/80">Official Trailer</p>
                    <h3 className="text-xl md:text-2xl font-semibold text-white mt-1">{currentTrailer.title}</h3>
                    {currentTrailer.studio && <p className="text-xs text-white/80 mt-1">{currentTrailer.studio}</p>}
                  </div>
                </>
              )}

              {/* Player view (shown when playing) */}
              {isPlaying && currentTrailer?.videoUrl && (
                <div className="absolute inset-0 z-30 bg-black">
                  <ReactPlayer
                    ref={playerRef}
                    url={currentTrailer.videoUrl}
                    width="100%"
                    height="100%"
                    playing={isPlaying}
                    controls
                  />
                  <button onClick={handleClose} className="absolute top-4 right-4 rounded-full bg-black/60 text-white p-2 z-40">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Thumbnails strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {thumbnailsList.length > 0 ? (
            thumbnailsList.map((trailer) => {
              const isActive = currentTrailer && trailer.videoUrl === currentTrailer.videoUrl && String(trailer.movieId) === String(currentTrailer.movieId);
              const ytId = trailer.videoUrl ? extractYouTubeId(trailer.videoUrl) : null;
              const max = ytId ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` : null;
              const hq = ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : null;
              const fall = trailer.image || max || hq || assets.screenImage;

              return (
                <button
                  key={`${trailer.movieId}-${trailer.videoUrl || "noUrl"}`}
                  onClick={() => handleSelectThumbnail(trailer)}
                  className={`relative overflow-hidden rounded-xl transition-transform duration-300 ${isActive ? "scale-105 border-4 border-red-600" : "border border-white/10 hover:scale-105 hover:shadow-lg"}`}
                >
                  <img
                    src={fall}
                    alt={trailer.title || "Trailer"}
                    onError={(e) => { if (e.currentTarget.src !== (hq || assets.screenImage)) e.currentTarget.src = hq || assets.screenImage; }}
                    className="w-full h-28 object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                    <div className="rounded-full bg-black/50 p-2">
                      <PlayCircle className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-3 py-1 text-xs text-white">{trailer.title || "Trailer"}</div>
                </button>
              );
            })
          ) : (
            <p className="text-white/80">No trailers available.</p>
          )}
        </div>
      </div>
      <BlurCircle top="-100px" right="-120px" />
    </section>
  );
};

export default TrailerSection;
