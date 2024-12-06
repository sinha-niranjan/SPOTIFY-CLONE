import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import { User } from "../models/user.model.js";

export const getStats = async (req, res, next) => {
  try {
    // const totalSongs = await Song.countDocuments();
    // const totalUsers = await User.countDocuments();
    // const totalAlbums = await Album.countDocuments();
    // const uniqueArtists = await Song.aggregate([
    //   {
    //     $unionWith: {
    //       coll: "songs",
    //       pipeline: [],
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: "$artist",
    //     },
    //   },
    //   {
    //     $count: "count",
    //   },
    // ]);
    const [totalSongs, totalUsers, totalAlbums, uniqueArtists] =
      await Promise.all([
        Song.countDocuments(),
        User.countDocuments(),
        Album.countDocuments(),
        Song.aggregate([
          {
            $unionWith: {
              coll: "songs",
              pipeline: [],
            },
          },
          {
            $group: {
              _id: "$artist",
            },
          },
          {
            $count: "count",
          },
        ]),
      ]);
    const stats = {
      totalAlbums,
      totalSongs,
      totalUsers,
      totalArtists: uniqueArtists[0]?.count || 0,
    };

    res.status(200).json({
      success: true,
      stats,
    });
  } catch (error) {
    next(error);
  }
};
