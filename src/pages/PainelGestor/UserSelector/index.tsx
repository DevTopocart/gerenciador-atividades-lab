import { Dialog, DialogContent, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, useState } from "react";

export default function UserSelector() {

    const [open, setOpen] = useState(false);

    return (
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          TransitionComponent={Transition}
          fullWidth={true}
          maxWidth="lg"
        >
          <DialogContent>
            Teste
          </DialogContent>
        </Dialog>
    );
}

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  