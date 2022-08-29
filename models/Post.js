const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

//Define our post model
class Post extends Model {
  static addlike(body, models) {
    return models.Like.create({
      user_id: body.user_id,
      post_id: body.post_id,
    }).then(() => {
      // then find the post we just Liked on
      return Post.findOne({
        where: {
          id: body.post_id,
        },
        attributes: [
          "id",
          "title",
          "created_at",
          // use raw MySQL aggregate function query to get a count of how many Likes the post has and return it under the name `Like_count`
          [
            sequelize.literal(
              "(SELECT COUNT(*) FROM likes WHERE post.id = likes.post_id)"
            ),
            "like_count",
          ],
        ],
      });
    });
  }
}

//create our fields/columns for the Post model
Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "image",
        key: "id",
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    achievement_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "achievement",
        key: "id",
      },
    },
  },
  // Second passing object
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "post",
  }
);

module.exports = Post;
