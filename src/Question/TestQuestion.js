import { Checkbox, Form } from "antd";
import "../Question/style.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { apiConstants } from "../Const/api";
import FormItem from "antd/es/form/FormItem";
import { useLocation, useParams } from "react-router";
import { Button, Modal } from 'antd';
import { useSearchParams } from "react-router-dom";

function TestQuestion() {
  const [time, setTime] = useState(5);
  const [modal, setModal] = useState(false)
  const [start, setStart] = useState(false)
  const [test, setTest] = useState({});
  const [pickAns, setPickAns] = useState(0);
  const { pathname } = useLocation();
  //  object de trucstering

  const [form] = Form.useForm();
  const answers = Form.useWatch("answers", form);

  const fetchTest = (id) => {
    console.log(id);
    axios.get(apiConstants.CHI_TIET_BAI_TEST(id)).then((res) => {
      setTest(res.data.data[0]);
      form.setFieldValue("danhSachCauHoi", res.data.data[0].cau_hoi);
    });
  };

  const handleStart = () => {
    setStart(true);
    console.log(start)
  }

  useEffect(() => {
    let cnt = 0;
    if (answers) {
      Object.values(answers)?.forEach((item) => {
        if (item?.length > 0) cnt++;
      });
      setPickAns(cnt);
      console.log("cnt", cnt);
    }
  }, [answers]);

  // const DecTime = () => {
  //   setTime(time - 1);
  //   console.log(`day la time : ${time}`);
  // };

  // const DecQuestion = () => {
  //   setQuestion(question - 1);
  // };

  useEffect(() => {
    let id = pathname.split('/')
    fetchTest(id[2])
  }, []);

  useEffect(() => {
    if (time === 0) {
      setModal(true)
      return;
    };
    const interval = start === true && setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);
    console.log(modal)

    return () => clearInterval(interval);
  }, [time, start, modal]);

  return (
    <Form form={form}>
      <Modal title="Thong bao toi gio m cut' " closable={false} open={modal} footer={null}>
        may cut con me m ra nha
      </Modal>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>{test.ten_bai_test}</h1>
          </div>
        </div>
        <div className="notification">

          <h3>Time Left : {time}</h3>
          <h4>The remaining questions : {test?.cau_hoi?.length - pickAns}/{test?.cau_hoi?.length}</h4>
        </div>

        <Form.Item name="answers" trigger="">
          {(test.cau_hoi ?? []).map((cauHoi, index) => {
            return (
              <fieldset id={1} className="form">
                <div className="form-test">
                  <div>
                    <p className="number">{index + 1}</p>
                  </div>
                  <p className="question">{cauHoi.noi_dung}</p>
                </div>
                <Form.Item name={["answers", cauHoi._id]}>
                  <Checkbox.Group className="check">
                    {cauHoi.dap_an.map((dapAn, index) => {
                      return (
                        <Checkbox
                          //disabled={time === 0}
                          value={index}
                          className="choice"
                        >
                          {dapAn}
                        </Checkbox>
                      );
                    })}
                  </Checkbox.Group>
                </Form.Item>
              </fieldset>
            );
          })}
        </Form.Item>
      </div>
      <button onClick={handleStart}>bắt đầu làm bài kiểm tra</button>
    </Form>
  );
}
export default TestQuestion;
