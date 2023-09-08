import Post from "../models/Post.model.js";
import User from "../models/User.model.js";
import cloudinary from "cloudinary";

// ========== CRUD: CREATE ==========
export const createPost = async (req, res) => {
    try {
        const { userId, description, picturesPath } = req.body;

        let picturePath = "";
        if (picture) {
            const result = await cloudinary.uploader.upload(picture, {
                folder: 'truth-free-pictures',// Folder name in Cloudinary
                resource_type: 'auto'
            });
            picturePath = result.secure_url;
        }

        const user = await User.findById(userId);
        const newPost = new Post ({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: [],
        });
        await newPost.save();

        const post = await Post.find();
        res.status(201).json(post);
    } catch (err) {
        res.status(409).json({ message: err.message });
    };
};



// ========== CRUD: READ ==========
export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find();
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({ message: err.message });
    };
};

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const post = await Post.find( { userId} );
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({ message: err.message });
    };
};



// ========== CRUD: UPDATE ==========
export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if (isLiked) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        };

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true}
        );

        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(404).json({ message: err.message });
    };
}