import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
public class QuickServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) {
        String s = request.getParameter("t1");
        HttpSession session = request.getSession();
        session.setAttribute("source", s);
    }
}