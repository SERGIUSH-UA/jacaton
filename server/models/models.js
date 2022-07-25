const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique:true},
    name: {type: DataTypes.STRING, allowNull: false},
    password: {type: DataTypes.STRING, unique:false, allowNull: false},
    role: {type: DataTypes.STRING, defaultValue: 'USER'},
    city: {type: DataTypes.STRING, allowNull: true},
    img: {type: DataTypes.STRING, allowNull: true},
    uuid: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4}
})

const Team = sequelize.define('team', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    city: {type: DataTypes.STRING, allowNull: true},
    parish: {type: DataTypes.STRING, allowNull: true},
    img: {type: DataTypes.STRING, allowNull: true}
})

const Game = sequelize.define('game', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    active: {type: DataTypes.BOOLEAN, defaultValue: true}
})

const Question = sequelize.define('question', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    answer: {type: DataTypes.STRING, allowNull: false}
})

const Answer = sequelize.define('answer', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    body: {type: DataTypes.STRING, allowNull: false},
    date: {type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW},
    success: {type: DataTypes.BOOLEAN, allowNull: false}
})

const GameTeam = sequelize.define('game_team', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})
const GameQuestion = sequelize.define('game_question', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})
const UserTeam = sequelize.define('user_team', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

User.belongsTo(Team)
Team.belongsTo(User, { foreignKey: 'captainId' });
Team.belongsToMany(User,{through: UserTeam})
Question.belongsToMany(Game, {through: GameQuestion})
Answer.belongsTo(Team)
Answer.belongsTo(Question)
Team.belongsToMany(Game, {through: GameTeam})
Game.belongsToMany(Team, {through: GameTeam})

module.exports = {
    User,
    Team,
    Game,
    Question,
    Answer,
    GameTeam,
    UserTeam,
    GameQuestion
}
