const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    //createdAt: { type: Date, default: Date.now },
    //modifiedAt: { type: Date, default: Date.now },
    // creator: { type: Schema.Types.ObjectId, ref: 'ApplicationUser' },
    //followers: [{ type: Schema.Types.ObjectId, ref: 'ApplicationUser' }],
    //posts: [{ type: Schema.Types.ObjectId, ref: 'Idea' }],
    //tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    //category: { type: Schema.Types.ObjectId, ref: 'Category' }

    //base properties
    id: {
        type: String,
        required: false,
        //unique: true,
        //autoIncrement: true
    },
    creationTime: {
        type: Date,
        default: Date.now
    },
    creatorUserId: {
        type: String,
        default: null,
        required: false
    },
    deleterUserId: {
        type: String,
        default: null,
        required: false
    },
    deletionTime: {
        type: Date,
        default: null,
        required: false
    },
    isDeleted: {
        type: Boolean,
        default: false,
        required: false
    },
    lastModificationTime: {
        type: Date,
        default: null,
        required: false
    },
    lastModifierUserId: {
        type: String,
        default: null,
        required: false
    },
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;

/*
soome categories

Business Ideas: new product or service ideas, marketing strategies, business model innovations.
Personal Development Ideas: self-improvement ideas, habits to form, personal goals.
Creative Ideas: writing prompts, art projects, photography ideas, music composition ideas.
Home Ideas: home renovation ideas, interior design ideas, gardening ideas, home automation ideas.
Education Ideas: learning resources, educational activities, research paper topics, study plans.
Entertainment Ideas: movie and TV show recommendations, book suggestions, game ideas, party planning ideas.
Travel Ideas: vacation planning, unique destinations, outdoor activities, off the beaten path experiences.
Fashion Ideas: outfit suggestions, fashion trends, personal styling ideas, beauty tips.
Food Ideas: recipe suggestions, ingredient combinations, cooking techniques, meal planning ideas.
Career Ideas: job search strategies, career development plans, professional networking opportunities.

Technology Ideas: software development, app development, new technology trends, hardware innovations.
Personal Finance Ideas: saving money, investment strategies, budgeting tips, credit management.
Health and Wellness Ideas: exercise plans, healthy recipes, mental health tips, personal grooming ideas.
Personal Growth Ideas: self-awareness, emotional intelligence, personal development plans, mindfulness practices.
Environmental Ideas: green living, sustainability, conservation, environmental activism.
Adventure Ideas: hiking, rock climbing, camping, backpacking, kayaking, and other outdoor activities.
Automotive Ideas: car maintenance, car detailing, car customization, car performance.
Pet Ideas: pet training, pet grooming, pet nutrition, pet-related DIY projects.
Home DIY Ideas: furniture building, woodworking, home repairs, home decor projects.
Craft Ideas: knitting, crochet, quilting, embroidery, painting and other crafts ideas.
Personal Shopping Ideas: clothing and accessory recommendations, fashion inspiration, personal shopping plans.
Personal Technology Ideas: new gadgets, software, and apps to try, technology tips and tricks.
Personal Safety Ideas: self-defense, emergency preparedness, personal security plans.
Personal Relationship Ideas: dating advice, communication tips, relationship building exercises.
Career Development Ideas: job search strategies, professional networking, career advancement plans.
Personal Spirituality Ideas: meditation, yoga, mindfulness, personal beliefs, and values.
Personal Transportation Ideas: biking, skateboarding, public transportation, carpooling and other transportation-related ideas.

Personal Communication Ideas: public speaking, writing, negotiation, conflict resolution and other communication skills.
Personal Learning Ideas: language learning, personal development courses, online classes, professional certifications.
Personal Organization Ideas: time management, task management, goal setting, productivity hacks.
Personal Fun Ideas: games, hobbies, activities, entertainment plans, comedy and comedy shows.
Personal Spirituality Ideas: mindfulness, meditation, yoga, spirituality, philosophy and self-reflection.
Personal Environmental Ideas: green living, sustainability, conservation, environmental activism.
Personal Home Ideas: home cleaning, organization, DIY projects, home repairs, and home automation.
Personal Security Ideas: personal safety, emergency preparedness, self-defense, and security systems.
Personal Wellness Ideas: nutrition, health, fitness, mental health, and wellness practices.
Personal Travel Ideas: vacation planning, travel tips, destination recommendations, and cultural experiences.
Personal Hobbies Ideas: photography, painting, drawing, music, writing, and other creative hobbies.
Personal Career Ideas: career development, job search, professional networking, and career advancement.
Personal Investment Ideas: stock market, real estate, personal finance, and money management.
Personal Technology Ideas: technology news, new gadgets, software, and apps to try, technology tips and tricks.
Personal Relationship Ideas: dating, communication, building relationships, and relationship advice.

Personal Parenting Ideas: child-rearing, parenting tips, activities for kids, and family fun ideas.
Personal Education Ideas: learning resources, educational activities, research paper topics, study plans, and homeschooling resources.
Personal Food Ideas: meal planning, cooking tips, recipes, ingredient combinations, and food storage ideas.
Personal Beauty Ideas: makeup tutorials, skincare advice, hair styling tips, and grooming ideas.
Personal Home Improvement Ideas: home renovation, interior design, gardening, and DIY projects.
Personal Fashion Ideas: clothing, accessories, and shoe recommendations, fashion inspiration and personal styling ideas.
Personal Fitness Ideas: workout plans, healthy living, nutrition, and mental health tips.
Personal Career Development Ideas: job search strategies, professional networking, career advancement plans, and resume building tips.
Personal Social Ideas: socializing, social skills, social events, and networking opportunities.
Personal Entrepreneurial Ideas: starting a business, marketing, sales, and business management tips.
Personal Outdoor Ideas: hiking, camping, fishing, hunting and other outdoor activities, and tips.
Personal Spirituality Ideas: mindfulness, meditation, yoga, and other spiritual practices, and self-reflection.
Personal Personal Growth Ideas: self-improvement, personal development, self-help and self-care tips.
Personal Finances Ideas: budgeting, saving money, investing, and debt management strategies.
Personal Personal Technology Ideas: technology news, new gadgets, software, and apps to try, technology tips and tricks.
*/