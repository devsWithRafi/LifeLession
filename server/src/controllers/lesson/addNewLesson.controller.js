import { validateLessonBodyData } from '../../helpers/validateLessonBodyData.js';
import { Lesson } from '../../models/lessonModel.js';

export const addNewLesson = async (req, res) => {
    try {
        const authUser = req.user;
        const data = validateLessonBodyData.parse(req.body);

        const isPremiumUser = authUser.plan === 'premium';
        const isAdmin = authUser.role === 'admin';

        if (!isAdmin && !isPremiumUser) {
            const totalLessons = await Lesson.countDocuments({
                author: authUser.id,
            });
            if (totalLessons >= 10) {
                return res.status(400).json({
                    success: false,
                    message:
                        'You’ve reached the free limit of 10 uploads. Upgrade your plan to enjoy unlimited uploads.',
                });
            }
        }

        const lesson = await Lesson.create({
            ...data,
            author: authUser.id,
        });
        return res.status(201).json({
            success: true,
            data: lesson,
            message: 'Your lesson has been published successfully',
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
