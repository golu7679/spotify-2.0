import { HeartIcon, VolumeUpIcon as VolumeDownIcon } from "@heroicons/react/outline";
import { FastForwardIcon, PauseIcon, PlayIcon, ReplyIcon, RewindIcon, VolumeUpIcon, SwitchHorizontalIcon } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import { useSongInfo } from "../hooks/useSongsInfo";
import useSpotify from "../hooks/useSpotify";
import debounce from "lodash";

export function Player() {

    const spotifyApi = useSpotify();
    const { data: session, status } = useSession();
    const [currentTrackId, setCurrentIdTrack] = useRecoilState(currentTrackIdState);

    const [isPlaying, setIsplaying] = useRecoilState(isPlayingState);
    const [volume, setVolume] = useState(50);

    const songInfo: any = {};
    // const songInfo = useSongInfo();

    const fetchCurrentSong = () => {
        if (!songInfo) {
            spotifyApi.getMyCurrentPlayingTrack().then(data => {
                setCurrentIdTrack(data.body?.item?.id);

                spotifyApi.getMyCurrentPlaybackState().then((data) => {
                    setIsplaying(data.body?.is_playing);
                })
            });
        }
    };

    const handlePlayPause = () => {
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
            if (data.body.is_playing) {
                spotifyApi.pause();
                setIsplaying(false);
            }
            else {
                spotifyApi.play();
                setIsplaying(true);
            }
        })
    };

    useEffect(() => {
        if (spotifyApi.getAccessToken() && !currentTrackId) {

            fetchCurrentSong();
            setVolume(50);

        }
    }, [currentTrackIdState, spotifyApi, session]);



    useEffect(() => {
        if (volume > 0 && volume < 100) {
            debounceAdjustVolume(volume);
        }
    }, [volume]);


    const debounceAdjustVolume = useCallback(
        debounce((volume) => {
            spotifyApi.setVolume(volume).catch((error) => { });
        }, 500), []);

    return (
        <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8 ">
            <div className="flex items-center space-x-4 ">
                <img className="hiden md:inline h-10 w-10" src={songInfo?.album?.images?.[0]?.url} alt="" />
                <div>
                    <h3>{songInfo?.name}</h3>
                    <p>{songInfo?.artists?.[0]?.name}</p>
                </div>
            </div>


            {/* center section */}
            <div className="flex items-center justify-evenly">
                <SwitchHorizontalIcon className="button" />
                <RewindIcon className="button" />

                {isPlaying ? <PauseIcon onClick={handlePlayPause} className="button w-10 h-10" /> : <PlayIcon onClick={handlePlayPause} className="button w-10 h-10" />}

                <FastForwardIcon className="button" />
                <ReplyIcon className="button" />

            </div>


            {/* Right side */}

            <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
                <VolumeDownIcon className="button" onClick={() => volume > 0 && setVolume(volume - 10)} />
                <input className="w-14 md:w-28" type="range" name="volume" value={volume} min={0} max={100} onChange={e => setVolume(+e.target.value)} />
                <VolumeUpIcon className="button" onClick={() => volume < 100 && setVolume(volume + 10)} />
            </div>

        </div>
    )
}