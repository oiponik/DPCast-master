import Typography from '@material-ui/core/Typography';
import { motion } from 'framer-motion';

function Error404Page() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center p-16">
      <div className="max-w-512 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1, transition: { delay: 0.1 } }}
        >
          <Typography variant="h1" color="inherit" className="font-medium mb-16">
            404
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
        >
          <Typography variant="h5" color="textSecondary" className="mb-16 font-normal">
            죄송합니다. 찾고 있는 페이지를 찾을 수 없습니다
          </Typography>
        </motion.div>
      </div>
    </div>
  );
}

export default Error404Page;
